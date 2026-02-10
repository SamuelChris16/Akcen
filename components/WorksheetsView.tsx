
import React, { useState, useEffect } from 'react';
import { 
  Play, 
  CheckCircle2, 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  Video, 
  HelpCircle,
  MoreVertical,
  Check,
  Calculator,
  BrainCircuit,
  Image as ImageIcon,
  UploadCloud,
  Camera,
  X,
  File,
  Clock,
  Menu,
  Lightbulb,
  ListChecks,
  BookOpen,
  Sparkles,
  Lock,
  Atom,
  Bot,
  Send,
  Presentation,
  Maximize2,
  ChevronLeft,
  AlertCircle,
  Zap,
  Trophy,
  Gift,
  Map,
  ShieldCheck,
  Award,
  PenTool,
  ListVideo,
  Info
} from 'lucide-react';

// --- Types & Mock Data ---

interface Task {
  id: string;
  type: 'video' | 'quiz' | 'practice' | 'reading';
  title: string;
  isCompleted: boolean;
  duration?: string;
  isMethodVideo?: boolean;
}

interface Stage {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  isLocked: boolean;
  tasks: Task[]; 
}

interface Set {
  id: string;
  title: string;
  isLocked?: boolean; 
  stages: Stage[];
  submissionStatus: 'none' | 'pending' | 'graded';
}

interface Chapter {
  id: string;
  title: string;
  progress: number;
  isLocked?: boolean; 
  isCompleted?: boolean; 
  introVideoId?: string; // New: Chapter Intro
  sets: Set[];
  submissionConfig?: {
    requiredPages: number; 
  };
}

interface Level {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'locked';
  introVideoId?: string; // New: Level Intro
  chapters: Chapter[];
}

// --- CONTENT DATABASE ---

type TaskContentType = 'practice' | 'video' | 'quiz' | 'reading';

interface TaskContent {
  type: TaskContentType;
  title: string;
  description: string;
  mediaUrl?: string; 
  videoUrl?: string;
  videoNotes?: { time: string; title: string; content: string }[]; 
  steps?: { step: number; text: string; note?: string; image?: string }[];
  readingBlocks?: { title: string; content: string }[];
  question?: string;
  options?: string[];
  correctOption?: number;
}

const TASK_CONTENT_DB: Record<string, TaskContent> = {
  // --- INTROS ---
  'intro-lvl-1': {
    type: 'video',
    title: 'Level 1 Introduction: Kinematics',
    description: 'Welcome to Level 1. In this level, we will master the study of motion without considering forces.',
    videoUrl: 'https://www.youtube.com/embed/hRecdJz1s1o', // Placeholder
    videoNotes: [
        { time: "0:10", title: "Objective", content: "Mastering displacement, velocity, and acceleration." },
        { time: "1:00", title: "Key Math", content: "We will use algebra and basic trigonometry." }
    ]
  },
  'intro-ch-1': {
    type: 'video',
    title: 'Chapter 1 Intro: 1D Motion',
    description: 'Understanding motion in a straight line.',
    videoUrl: 'https://www.youtube.com/embed/zmH3B1z7fKo', // Placeholder
    videoNotes: [
        { time: "0:20", title: "The Number Line", content: "Think of 1D motion as moving along a number line (x-axis)." }
    ]
  },

  // --- LEVEL 1 STAGE 1 VIDEOS ---
  't-l1-s1-v1': {
    type: 'video',
    title: 'Concept: Scalars vs Vectors',
    description: 'Understanding the fundamental difference in physical quantities.',
    videoUrl: 'https://www.youtube.com/embed/Ixj1J0i6Hes', 
    videoNotes: [
        { time: "0:30", title: "Definition", content: "Scalars have magnitude only. Vectors have magnitude AND direction." },
        { time: "2:15", title: "Examples", content: "Speed is scalar. Velocity is a vector." }
    ]
  },
  't-l1-s1-v2': {
    type: 'video',
    title: 'Method: Vector Addition (Head-to-Tail)',
    description: 'How to visually combine vectors.',
    videoUrl: 'https://www.youtube.com/embed/MIN_Z655yMs',
    videoNotes: [
        { time: "1:00", title: "The Rule", content: "Place the tail of the second vector at the head of the first." },
        { time: "3:45", title: "Resultant", content: "Draw a line from the start point to the final end point." }
    ]
  },
  
  // --- DEFAULT FALLBACK ---
  'default': {
    type: 'video',
    title: 'Select Content',
    description: 'Select an item from the sidebar to begin.',
    videoNotes: []
  }
};

const MOCK_CURRICULUM: Level[] = [
  {
      id: 'lvl-0',
      title: 'Level 0: Fundamentals (Completed)',
      status: 'completed',
      introVideoId: 'intro-lvl-1', // Reusing for mock
      chapters: [
          {
              id: 'ch-0-1', title: 'Ch 1: Algebra Review', progress: 100, isCompleted: true, introVideoId: 'intro-ch-1', sets: [
                  { id: 'set-0-1', title: 'Set 1: Basic Algebra', isLocked: false, submissionStatus: 'graded', stages: []}
              ]
          },
      ]
  },
  {
    id: 'lvl-1',
    title: 'Level 1: Kinematics (Active)',
    status: 'in-progress',
    introVideoId: 'intro-lvl-1',
    chapters: [
      {
        id: 'ch-1-1',
        title: 'Ch 1: 1D Motion',
        progress: 15,
        isLocked: false,
        introVideoId: 'intro-ch-1',
        submissionConfig: { requiredPages: 2 }, 
        sets: [
          {
            id: 'set-1-1',
            title: 'Set 1: Vectors & Scalars',
            isLocked: false,
            submissionStatus: 'pending',
            stages: [
              { 
                id: 's-1-1-1', title: 'Stage 1: Vector Concepts', isCompleted: false, isLocked: false,
                tasks: [
                  { id: 't-l1-s1-v1', type: 'video', title: 'Concept: Scalar vs Vector', isCompleted: true, duration: '5m' },
                  { id: 't-l1-s1-v2', type: 'video', title: 'Method: Vector Addition', isCompleted: false, duration: '8m', isMethodVideo: true }
                ]
              },
              { 
                id: 's-1-1-2', title: 'Stage 2: Calculating Components', isCompleted: false, isLocked: true,
                tasks: []
              }
            ]
          },
          {
              id: 'set-1-2', title: 'Set 2: Velocity & Acceleration', isLocked: true, submissionStatus: 'none',
              stages: []
          }
        ]
      }
    ]
  },
  {
      id: 'lvl-2',
      title: 'Level 2: Dynamics (Locked)',
      status: 'locked',
      chapters: [
          { id: 'ch-2-1', title: 'Ch 1: Newton\'s Laws', progress: 0, isLocked: true, sets: [] },
          { id: 'ch-2-2', title: 'Ch 2: Energy & Work', progress: 0, isLocked: true, sets: [] }
      ]
  }
];

type ViewContext = 'level-intro' | 'chapter-intro' | 'stage';

interface WorksheetsViewProps {
  onToggleSidebar?: () => void;
  onNavigate: (tab: string) => void;
}

const WorksheetsView: React.FC<WorksheetsViewProps> = ({ onToggleSidebar, onNavigate }) => {
  // State for Navigation Hierarchy
  const [expandedChapter, setExpandedChapter] = useState<string>('ch-1-1');
  const [activeSet, setActiveSet] = useState<string>('set-1-1');
  
  // Selection State
  const [viewContext, setViewContext] = useState<ViewContext>('stage');
  const [selectedEntityId, setSelectedEntityId] = useState<string>('s-1-1-1'); // Can be Level ID, Chapter ID, or Stage ID
  const [activeVideoId, setActiveVideoId] = useState<string>('t-l1-s1-v1'); 
  
  // Right Panel State
  const [rightPanelTab, setRightPanelTab] = useState<'solution' | 'submit'>('solution'); 
  const [pageUploads, setPageUploads] = useState<Record<number, string>>({});
  
  // AI State
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<{role: 'ai'|'user', text: string}[]>([
      { role: 'ai', text: "Hi! I'm Newton-Bot. I can explain any step in these videos." }
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [showReward, setShowReward] = useState<{label: string} | null>(null);

  // --- HELPERS TO FIND DATA ---
  const findLevel = (lvlId: string) => MOCK_CURRICULUM.find(l => l.id === lvlId);
  const findChapter = (chId: string) => {
      for (const lvl of MOCK_CURRICULUM) {
          const ch = lvl.chapters.find(c => c.id === chId);
          if (ch) return { level: lvl, chapter: ch };
      }
      return null;
  };
  const findStageContext = (stageId: string) => {
      for (const lvl of MOCK_CURRICULUM) {
          for (const ch of lvl.chapters) {
              for (const set of ch.sets) {
                  const stage = set.stages.find(s => s.id === stageId);
                  if (stage) return { level: lvl, chapter: ch, set, stage };
              }
          }
      }
      return null;
  };

  // --- NAVIGATION HANDLERS ---
  const handleSelectLevelIntro = (levelId: string, videoId?: string) => {
      setViewContext('level-intro');
      setSelectedEntityId(levelId);
      setActiveVideoId(videoId || 'default');
      setRightPanelTab('solution'); // Force notes tab
  };

  const handleSelectChapterIntro = (chapterId: string, videoId?: string) => {
      setViewContext('chapter-intro');
      setSelectedEntityId(chapterId);
      setActiveVideoId(videoId || 'default');
      setRightPanelTab('solution'); // Force notes tab
  };

  const handleSelectStage = (stageId: string, tasks: Task[]) => {
      setViewContext('stage');
      setSelectedEntityId(stageId);
      if (tasks.length > 0) setActiveVideoId(tasks[0].id);
  };

  const toggleChapter = (id: string, isLocked?: boolean) => {
    if (isLocked) return; 
    setExpandedChapter(expandedChapter === id ? '' : id);
  };

  // --- DERIVED DATA FOR RENDER ---
  const currentContent = TASK_CONTENT_DB[activeVideoId] || TASK_CONTENT_DB['default'];
  
  // Breadcrumb Logic
  let breadcrumbs = [];
  let videoTasks: Task[] = [];
  let requiredPagesCount = 1;

  if (viewContext === 'level-intro') {
      const l = findLevel(selectedEntityId);
      breadcrumbs = [l?.title, 'Introduction'];
  } else if (viewContext === 'chapter-intro') {
      const data = findChapter(selectedEntityId);
      breadcrumbs = [data?.level.title, data?.chapter.title, 'Introduction'];
  } else if (viewContext === 'stage') {
      const data = findStageContext(selectedEntityId);
      if (data) {
          breadcrumbs = [data.chapter.title, data.set.title, data.stage.title];
          videoTasks = data.stage.tasks.filter(t => t.type === 'video');
          requiredPagesCount = data.chapter.submissionConfig?.requiredPages || 1;
      }
  }

  const filledPagesCount = Object.keys(pageUploads).length;
  const isReadyToSubmit = filledPagesCount === requiredPagesCount;

  // --- ACTIONS ---
  const handlePageUpload = (pageIndex: number) => {
    setTimeout(() => {
        setPageUploads(prev => ({
            ...prev,
            [pageIndex]: `page_${pageIndex + 1}_scan.jpg`
        }));
    }, 500);
  };

  const removePage = (pageIndex: number) => {
      setPageUploads(prev => {
          const newState = { ...prev };
          delete newState[pageIndex];
          return newState;
      });
  };

  const handleAiSend = (e: React.FormEvent) => {
    e.preventDefault();
    if(!aiInput.trim()) return;
    setAiMessages(prev => [...prev, { role: 'user', text: aiInput }]);
    const userQ = aiInput;
    setAiInput('');
    setIsAiThinking(true);
    setTimeout(() => {
        let response = "That's an interesting question. Review the notes for a hint.";
        setAiMessages(prev => [...prev, { role: 'ai', text: response }]);
        setIsAiThinking(false);
    }, 1500);
  };

  const handleCompleteTask = () => {
    setShowReward({ label: 'Progress Updated' });
    setTimeout(() => { setShowReward(null); }, 2000);
  };

  return (
    <div className="flex h-full bg-akcen-white overflow-hidden relative">
      {/* Reward Overlay */}
      {showReward && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-300">
              <div className="bg-white p-8 rounded-[2rem] shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-300 scale-110">
                   <div className="relative">
                       <div className="absolute inset-0 bg-green-400 blur-xl opacity-50 rounded-full animate-pulse"></div>
                       <CheckCircle2 size={80} className="text-akcen-green relative z-10 drop-shadow-lg" fill="currentColor" />
                   </div>
                   <h2 className="text-2xl font-serif font-bold text-akcen-text mt-4">{showReward.label}</h2>
              </div>
          </div>
      )}

      {/* --- LEFT SIDEBAR: CURRICULUM TREE --- */}
      <div className="w-80 bg-white border-r border-akcen-gray flex flex-col flex-shrink-0 z-10 hidden md:flex">
        <div className="p-6 flex items-center gap-3">
           <div className="p-2.5 bg-akcen-text text-white rounded-xl shadow-lg shadow-akcen-text/20">
              <Map size={20} />
           </div>
           <div>
             <h2 className="font-serif font-bold text-akcen-text text-lg leading-none">World Map</h2>
             <p className="text-[10px] text-akcen-muted uppercase font-bold tracking-wider mt-1">Physics 101</p>
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-8 pb-10">
            {MOCK_CURRICULUM.map((level) => {
                const isLevelCompleted = level.status === 'completed';
                const isLevelLocked = level.status === 'locked';
                const isLevelIntroActive = viewContext === 'level-intro' && selectedEntityId === level.id;

                return (
                    <div key={level.id} className={`relative ${isLevelLocked ? 'opacity-60 grayscale-[0.8]' : ''}`}>
                        <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-akcen-gray -z-10 h-full"></div>

                        {/* Level Header */}
                        <div className="flex items-center gap-3 mb-2 pl-1">
                             <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold z-10 border-2 border-white shadow-sm
                                ${isLevelCompleted ? 'bg-akcen-green text-white' : isLevelLocked ? 'bg-gray-200 text-gray-500' : 'bg-akcen-blue text-white'}
                             `}>
                                 {isLevelCompleted ? <Check size={12}/> : isLevelLocked ? <Lock size={10}/> : <span className="w-2 h-2 rounded-full bg-white"></span>}
                             </div>
                             <span className={`text-xs font-bold uppercase tracking-widest ${isLevelCompleted ? 'text-akcen-green' : isLevelLocked ? 'text-gray-400' : 'text-akcen-blue'}`}>
                                 {level.title}
                             </span>
                        </div>

                        {/* Level Introduction Link */}
                        <div className="pl-4 mb-3">
                            <button
                                onClick={() => !isLevelLocked && handleSelectLevelIntro(level.id, level.introVideoId)}
                                disabled={isLevelLocked}
                                className={`w-full flex items-center gap-3 p-2 rounded-lg text-xs font-medium transition-all
                                    ${isLevelIntroActive 
                                        ? 'bg-akcen-blue text-white shadow-md' 
                                        : 'text-akcen-muted hover:bg-akcen-white hover:text-akcen-text'
                                    }
                                `}
                            >
                                <Info size={14} />
                                Level Introduction
                            </button>
                        </div>
                        
                        {/* Chapters */}
                        <div className="space-y-3 pl-4">
                            {level.chapters.map((chapter) => {
                                const isExpanded = expandedChapter === chapter.id;
                                const isChapterIntroActive = viewContext === 'chapter-intro' && selectedEntityId === chapter.id;
                                const isLocked = chapter.isLocked;

                                return (
                                    <div key={chapter.id} className={`rounded-xl transition-all duration-300 relative group
                                        ${isExpanded ? 'bg-white shadow-md border border-akcen-gray/50 scale-[1.02] z-20' : ''}
                                    `}>
                                        <button 
                                            onClick={() => toggleChapter(chapter.id, isLocked)}
                                            disabled={isLocked}
                                            className={`w-full flex items-center justify-between p-3 text-sm font-medium transition-all rounded-xl relative overflow-hidden
                                              ${isExpanded ? 'text-akcen-blue' : 'text-akcen-text hover:bg-akcen-white'}
                                              ${isLocked ? 'cursor-not-allowed opacity-50' : ''}
                                            `}
                                        >
                                            {isExpanded && <div className="absolute left-0 top-0 bottom-0 w-1 bg-akcen-blue"></div>}
                                            <div className="flex items-center gap-3 pl-1">
                                                {chapter.isCompleted ? <CheckCircle2 size={16} className="text-akcen-green" /> : <div className={`w-2 h-2 rounded-full ${isExpanded ? 'bg-akcen-blue' : 'bg-akcen-gray'}`}></div>}
                                                <span className="font-serif font-bold text-left">{chapter.title}</span>
                                            </div>
                                        </button>

                                        {isExpanded && !isLocked && (
                                            <div className="px-3 pb-3 pt-1 space-y-1">
                                                {/* Chapter Introduction Link */}
                                                <button
                                                    onClick={() => handleSelectChapterIntro(chapter.id, chapter.introVideoId)}
                                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold font-sans mb-2 transition-all
                                                        ${isChapterIntroActive 
                                                            ? 'bg-blue-100 text-akcen-blue' 
                                                            : 'text-akcen-muted hover:bg-akcen-white'
                                                        }
                                                    `}
                                                >
                                                    <Play size={12} fill="currentColor" />
                                                    Chapter Introduction
                                                </button>

                                                {/* Sets & Stages */}
                                                {chapter.sets.map((set) => (
                                                    <div key={set.id} className="pt-2">
                                                        <div 
                                                            onClick={() => !set.isLocked && setActiveSet(set.id)}
                                                            className={`px-3 py-2 text-xs font-bold font-sans rounded-lg flex items-center justify-between transition-all cursor-pointer
                                                              ${set.isLocked 
                                                                ? 'opacity-50 cursor-not-allowed bg-gray-50' 
                                                                : activeSet === set.id 
                                                                  ? 'bg-akcen-blue text-white shadow-md' 
                                                                  : 'text-akcen-text bg-akcen-white hover:bg-blue-50/50'
                                                              }
                                                            `}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                {set.isLocked && <Lock size={10} />}
                                                                <span>{set.title}</span>
                                                            </div>
                                                        </div>

                                                        {!set.isLocked && activeSet === set.id && (
                                                          <div className="flex flex-col gap-1 mt-2 pl-3 border-l border-akcen-gray/30 ml-2">
                                                              {set.stages.map((stage) => {
                                                                  const isStageActive = viewContext === 'stage' && selectedEntityId === stage.id;
                                                                  return (
                                                                      <button
                                                                          key={stage.id}
                                                                          onClick={() => handleSelectStage(stage.id, stage.tasks)}
                                                                          disabled={stage.isLocked}
                                                                          className={`
                                                                              text-left px-3 py-1.5 rounded-md text-[10px] font-medium transition-all flex items-center gap-2
                                                                              ${isStageActive 
                                                                                ? 'text-akcen-blue font-bold bg-blue-50' 
                                                                                : 'text-akcen-muted hover:text-akcen-text hover:bg-white'
                                                                              }
                                                                          `}
                                                                      >
                                                                          <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
                                                                          {stage.title}
                                                                          {stage.isCompleted && <Check size={10} className="text-akcen-green ml-auto" />}
                                                                      </button>
                                                                  )
                                                              })}
                                                          </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-akcen-white">
        
        {/* Header Breadcrumbs */}
        <header className="h-16 flex items-center px-4 lg:px-6 bg-white/80 backdrop-blur-md border-b border-akcen-gray flex-shrink-0 justify-between z-20">
             <div className="flex items-center gap-4 overflow-hidden">
                {onToggleSidebar && (
                  <button onClick={onToggleSidebar} className="lg:hidden text-akcen-muted hover:text-akcen-blue">
                    <Menu size={24} />
                  </button>
                )}
                 <div className="flex items-center gap-2 text-sm text-akcen-muted overflow-hidden whitespace-nowrap font-medium">
                    {breadcrumbs.map((crumb, i) => (
                        <React.Fragment key={i}>
                            <span className={`truncate max-w-[100px] lg:max-w-[150px] ${i === breadcrumbs.length - 1 ? 'font-bold text-akcen-text' : ''}`}>{crumb}</span>
                            {i < breadcrumbs.length - 1 && <ChevronRight size={14} className="opacity-50 flex-shrink-0" />}
                        </React.Fragment>
                    ))}
                 </div>
             </div>
             
             <div className="flex items-center gap-3">
                 <button 
                    onClick={() => setIsAiOpen(!isAiOpen)}
                    className={`px-3 lg:px-4 py-2 text-xs font-bold rounded-full transition-all flex items-center gap-2 border shadow-sm
                      ${isAiOpen ? 'bg-akcen-text text-white border-akcen-text' : 'bg-white text-akcen-text hover:bg-akcen-white border-akcen-gray'}
                    `}
                 >
                    <Bot size={16} />
                    <span className="hidden sm:inline">{isAiOpen ? 'Close Assistant' : 'Ask Newton'}</span>
                 </button>
             </div>
        </header>

        {/* Content Split View */}
        <div className="flex-1 overflow-hidden relative">
            <div className="absolute inset-0 overflow-y-auto p-4 lg:p-6 custom-scrollbar z-0">
              <div className={`max-w-[1600px] mx-auto h-full flex flex-col lg:flex-row gap-6 transition-all duration-300 ${isAiOpen ? 'lg:pr-96' : ''}`}>
                  
                  {/* --- LEFT PANEL: VIDEO & PLAYLIST --- */}
                  <div className="flex-1 flex flex-col gap-6 min-w-0">
                      
                      {/* Video Player */}
                      {currentContent.videoUrl ? (
                          <div className="w-full aspect-video bg-black rounded-[1.5rem] overflow-hidden shadow-2xl relative group border border-akcen-gray ring-1 ring-white/50">
                              <iframe 
                                  src={currentContent.videoUrl} 
                                  className="w-full h-full" 
                                  title="Video content"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                  allowFullScreen
                              ></iframe>
                          </div>
                      ) : (
                          <div className="w-full h-64 bg-akcen-white rounded-[1.5rem] flex items-center justify-center border border-akcen-gray text-akcen-muted">
                              No video selected
                          </div>
                      )}

                      {/* Playlist (Only show for Stage view) */}
                      {viewContext === 'stage' && videoTasks.length > 0 && (
                          <div className="bg-white p-4 lg:p-6 rounded-[2rem] border border-akcen-gray shadow-card max-h-[400px] lg:max-h-none overflow-y-auto custom-scrollbar">
                              <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-blue-50 rounded-lg text-akcen-blue">
                                      <ListVideo size={20} />
                                  </div>
                                  <h3 className="text-lg font-serif font-bold text-akcen-text">Stage Playlist</h3>
                              </div>
                              <div className="space-y-3">
                                  {videoTasks.map((task, idx) => (
                                      <button
                                          key={task.id}
                                          onClick={() => setActiveVideoId(task.id)}
                                          className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all group
                                              ${activeVideoId === task.id 
                                                  ? 'bg-akcen-blue text-white border-akcen-blue shadow-md' 
                                                  : 'bg-akcen-white border-transparent hover:bg-white hover:border-akcen-gray hover:shadow-sm text-akcen-text'
                                              }
                                          `}
                                      >
                                          <div className="flex items-center gap-4">
                                              <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-xs border flex-shrink-0
                                                  ${activeVideoId === task.id ? 'bg-white/20 text-white border-white/20' : 'bg-white text-akcen-muted border-akcen-gray'}
                                              `}>
                                                  {idx + 1}
                                              </div>
                                              <div className="min-w-0">
                                                  <div className="font-bold text-sm leading-tight mb-0.5 truncate">{task.title}</div>
                                                  <div className={`text-[10px] uppercase font-bold flex items-center gap-2 ${activeVideoId === task.id ? 'text-blue-100' : 'text-akcen-muted'}`}>
                                                      <span className="flex items-center gap-1"><Clock size={10}/> {task.duration || '5m'}</span>
                                                  </div>
                                              </div>
                                          </div>
                                          {activeVideoId === task.id && <Play size={16} fill="currentColor" className="flex-shrink-0" />}
                                      </button>
                                  ))}
                              </div>
                          </div>
                      )}
                      
                      {viewContext !== 'stage' && (
                          <div className="bg-white p-6 rounded-[2rem] border border-akcen-gray shadow-card">
                              <h3 className="text-lg font-serif font-bold text-akcen-text mb-2">{currentContent.title}</h3>
                              <p className="text-sm text-akcen-muted">{currentContent.description}</p>
                          </div>
                      )}
                  </div>

                  {/* --- RIGHT PANEL: NOTES & SUBMISSION --- */}
                  <div className="w-full lg:w-[420px] flex-shrink-0 flex flex-col gap-4">
                      {/* Responsive Height Container */}
                      <div className="bg-white rounded-[2rem] border border-akcen-gray shadow-card overflow-hidden flex flex-col min-h-[500px] lg:h-[calc(100vh-10rem)] lg:sticky lg:top-0">
                          
                          {/* Tabs */}
                          <div className="p-3 border-b border-akcen-gray bg-white/50 backdrop-blur-sm">
                            <div className="bg-akcen-white p-1 rounded-xl flex">
                                  <button 
                                      onClick={() => setRightPanelTab('solution')}
                                      className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 
                                        ${rightPanelTab === 'solution' ? 'bg-white shadow-sm text-akcen-text border border-akcen-gray/20' : 'text-akcen-muted hover:text-akcen-text'}
                                      `}
                                  >
                                       <Lightbulb size={14} /> Video Notes
                                  </button>
                                  
                                  {/* Only show Submission tab if in Stage context */}
                                  {viewContext === 'stage' && (
                                    <button 
                                        onClick={() => setRightPanelTab('submit')}
                                        className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 
                                            ${rightPanelTab === 'submit' ? 'bg-white shadow-sm text-akcen-text border border-akcen-gray/20' : 'text-akcen-muted hover:text-akcen-text'}
                                        `}
                                    >
                                        <UploadCloud size={14} /> Worksheet
                                    </button>
                                  )}
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#FAFAFA]">
                              
                              {/* MODE: NOTES */}
                              {rightPanelTab === 'solution' && (
                                <div className="p-5 space-y-6 flex flex-col h-full">
                                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-2 flex items-start gap-3">
                                        <div className="mt-0.5 text-akcen-blue"><PenTool size={14}/></div>
                                        <div>
                                            <h4 className="text-xs font-bold text-akcen-blue uppercase">Notes for:</h4>
                                            <p className="text-sm font-serif font-bold text-akcen-text">{currentContent.title}</p>
                                        </div>
                                    </div>

                                    {currentContent.videoNotes && currentContent.videoNotes.length > 0 ? (
                                        <div className="relative pl-4 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-akcen-gray/50">
                                            {currentContent.videoNotes.map((note, i) => (
                                                <div key={i} className="relative pl-6">
                                                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-white border-2 border-akcen-blue text-akcen-blue flex items-center justify-center font-bold text-[10px] shadow-sm z-10">
                                                        {i + 1}
                                                    </div>
                                                    <div className="bg-white p-4 rounded-2xl border border-akcen-gray shadow-sm">
                                                        <div className="flex justify-between items-start mb-1">
                                                            <h4 className="text-sm font-bold text-akcen-text">{note.title}</h4>
                                                            <span className="text-[10px] font-mono bg-akcen-gray/30 text-akcen-muted px-1.5 py-0.5 rounded">{note.time}</span>
                                                        </div>
                                                        <p className="text-xs text-akcen-text/80 leading-relaxed">{note.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-10 text-akcen-muted text-sm">No notes available.</div>
                                    )}

                                    <div className="mt-auto pt-6 pb-6 lg:pb-0">
                                        <button 
                                          onClick={handleCompleteTask}
                                          className="w-full bg-white border border-akcen-gray text-akcen-text py-4 rounded-xl font-bold text-sm hover:bg-akcen-white transition-all flex items-center justify-center gap-2 shadow-sm"
                                        >
                                            <CheckCircle2 size={18} className="text-akcen-green" /> 
                                            Mark as Watched
                                        </button>
                                    </div>
                                </div>
                              )}

                              {/* MODE: SUBMIT (Stage Only) */}
                              {rightPanelTab === 'submit' && viewContext === 'stage' && (
                                <div className="p-5 flex flex-col h-full">
                                  <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6">
                                      <h4 className="font-serif font-bold text-orange-700 text-sm mb-1 flex items-center gap-2">
                                          <UploadCloud size={16}/> Stage Submission
                                      </h4>
                                      <p className="text-xs text-orange-800/80 leading-relaxed">
                                        Complete the stage playlist, then upload your work.<br/>
                                        <strong>Required: {requiredPagesCount} pages</strong>
                                      </p>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3 mb-4">
                                      {Array.from({ length: requiredPagesCount }).map((_, index) => {
                                          const hasFile = pageUploads[index];
                                          return (
                                              <div 
                                                key={index}
                                                onClick={() => !hasFile && handlePageUpload(index)}
                                                className={`relative aspect-[3/4] rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all group
                                                    ${hasFile ? 'bg-white border-akcen-green' : 'bg-akcen-white border-akcen-gray hover:border-akcen-blue'}
                                                `}
                                              >
                                                  {hasFile ? (
                                                      <>
                                                          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-akcen-green mb-2"><FileText size={20} /></div>
                                                          <span className="text-xs font-bold text-akcen-text">Page {index + 1}</span>
                                                          <button onClick={(e) => { e.stopPropagation(); removePage(index); }} className="absolute top-2 right-2 p-1 bg-red-50 text-red-500 rounded-full"><X size={12} /></button>
                                                      </>
                                                  ) : (
                                                      <>
                                                          <Camera size={20} className="text-akcen-muted group-hover:text-akcen-blue mb-2" />
                                                          <span className="text-xs font-bold text-akcen-muted group-hover:text-akcen-blue">Page {index + 1}</span>
                                                      </>
                                                  )}
                                              </div>
                                          )
                                      })}
                                  </div>

                                  <div className="mt-auto pt-4 border-t border-akcen-gray pb-6 lg:pb-0">
                                      <div className="flex justify-between text-xs font-bold text-akcen-muted mb-3">
                                          <span>Progress</span>
                                          <span>{filledPagesCount} / {requiredPagesCount} Pages</span>
                                      </div>
                                      <div className="w-full h-2 bg-akcen-gray rounded-full overflow-hidden mb-4">
                                          <div className={`h-full transition-all duration-500 ${isReadyToSubmit ? 'bg-akcen-green' : 'bg-akcen-blue'}`} style={{ width: `${(filledPagesCount / requiredPagesCount) * 100}%` }}></div>
                                      </div>
                                      <button 
                                        disabled={!isReadyToSubmit}
                                        className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg
                                            ${isReadyToSubmit ? 'bg-gradient-to-r from-akcen-green to-emerald-600 text-white hover:scale-[1.02]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                                        `}
                                      >
                                          {isReadyToSubmit ? <><Gift size={18} /> Submit Work</> : 'Complete Uploads'}
                                      </button>
                                  </div>
                                </div>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
            </div>

            {/* AI Assistant Panel */}
            <div className={`absolute top-0 right-0 h-full w-full md:w-96 bg-white/90 backdrop-blur-xl border-l border-akcen-gray z-30 transition-transform duration-300 shadow-2xl flex flex-col ${isAiOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                 <div className="h-16 flex items-center justify-between px-6 border-b border-akcen-gray">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-akcen-text text-white flex items-center justify-center shadow-md"><Bot size={16} /></div>
                       <div><h3 className="font-bold text-sm text-akcen-text font-serif">Newton AI</h3></div>
                    </div>
                    <button onClick={() => setIsAiOpen(false)} className="p-2 rounded-full hover:bg-akcen-gray"><X size={20} /></button>
                 </div>
                 <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-akcen-white/50">
                     {aiMessages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                           <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-akcen-blue text-white rounded-tr-none' : 'bg-white border border-akcen-gray text-akcen-text rounded-tl-none'}`}>
                              {msg.text}
                           </div>
                        </div>
                     ))}
                     {isAiThinking && <div className="flex justify-start"><span className="text-xs text-akcen-muted italic p-2">Thinking...</span></div>}
                 </div>
                 <div className="p-4 bg-white border-t border-akcen-gray">
                    <form onSubmit={handleAiSend} className="relative flex items-center gap-2">
                       <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="Ask for a hint..." className="flex-1 bg-akcen-white border border-akcen-gray rounded-xl pl-4 pr-12 py-3 text-xs font-medium focus:ring-2 focus:ring-akcen-blue/20" />
                       <button type="submit" disabled={!aiInput.trim() || isAiThinking} className="p-3 bg-akcen-text text-white rounded-xl shadow-md"><Send size={16} /></button>
                    </form>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WorksheetsView;
