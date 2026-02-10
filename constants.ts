
import { User, WorksheetEvent, ChartDataPoint, RadarDataPoint, ChapterDataPoint, ProgressDataPoint, AccuracyDataPoint, NotificationItem, RankTier } from './types';
import { Sparkles, BookOpen, GraduationCap, Microscope, Award, Zap, Sword, Target, Shield, Scroll } from 'lucide-react';

export const MOCK_MENTORS: User[] = [
  { id: '1', name: 'Dr. Emily Chen', avatar: 'https://picsum.photos/40/40?random=20', status: 'online', role: 'Physics Lead', level: 'PhD Astrophysics' },
  { id: '2', name: 'Prof. Alan Grant', avatar: 'https://picsum.photos/40/40?random=21', status: 'busy', role: 'Lab Instructor', level: 'Applied Physics' },
  { id: '3', name: 'Sarah Connor', avatar: 'https://picsum.photos/40/40?random=22', status: 'offline', role: 'TA', level: 'Mechanics' },
];

export const MOCK_EVENTS: WorksheetEvent[] = [
  { id: '101', title: 'Newton\'s Laws: Advanced', subject: 'Physics', score: 92, date: '2024-06-12T10:00:00', status: 'completed' },
  { id: '102', title: 'Kinematics: Projectile Motion', subject: 'Physics', score: 85, date: '2024-06-11T09:15:00', status: 'completed' },
  { id: '103', title: 'Vectors & Scalars', subject: 'Physics', score: 98, date: '2024-06-10T14:30:00', status: 'completed' },
  { id: '104', title: 'Work, Energy & Power', subject: 'Physics', score: 0, date: '2024-06-13T11:00:00', status: 'in-progress' },
  { id: '105', title: 'Fluid Dynamics Intro', subject: 'Physics', score: 0, date: '2024-06-14T09:00:00', status: 'pending' },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'grade',
    title: 'Submission Graded',
    message: 'Dr. Emily Chen graded "Newton\'s Laws". Score: 92/100.',
    time: '2h ago',
    read: false,
    actionLabel: 'View Feedback',
    targetTab: 'worksheets'
  },
  {
    id: '2',
    type: 'mentor',
    title: 'New Mentor Message',
    message: 'Prof. Alan: "Check my notes on Q3 to improve your analysis."',
    time: '4h ago',
    read: false,
    actionLabel: 'Reply',
    targetTab: 'community'
  },
  {
    id: '3',
    type: 'streak',
    title: 'Consistency Alert',
    message: 'Your study streak is at risk! Complete 1 task to maintain.',
    time: '6h ago',
    read: true,
    actionLabel: 'Do Task',
    targetTab: 'worksheets'
  },
  {
    id: '4',
    type: 'unlock',
    title: 'New Module Available',
    message: 'You have unlocked "Ch 2: Trigonometry Basics".',
    time: 'Yesterday',
    read: true,
    targetTab: 'worksheets'
  },
];

// Calculated Target: (4 days * 1) + (3 days * 3) = 13
export const WEEKLY_WORK_TARGET = 13;

// Cumulative Data for S-Curve
export const SCURVE_DATA: ProgressDataPoint[] = [
  { date: 'Week 1', plannedMin: 5, plannedMax: 8, actual: 3 }, 
  { date: 'Week 2', plannedMin: 12, plannedMax: 18, actual: 10 }, 
  { date: 'Week 3', plannedMin: 22, plannedMax: 30, actual: 23 }, 
  { date: 'Week 4', plannedMin: 35, plannedMax: 45, actual: 48 }, 
  { date: 'Week 5', plannedMin: 50, plannedMax: 65, actual: 68 }, 
  { date: 'Week 6', plannedMin: 68, plannedMax: 85, actual: 72 }, 
  { date: 'Week 7', plannedMin: 85, plannedMax: 100, actual: null }, 
  { date: 'Week 8', plannedMin: 100, plannedMax: 120, actual: null }, 
];

// Daily Data
export const CHART_DATA: ChartDataPoint[] = [
  { date: 'Mon', worksheets: 2, target: 1, avgScore: 78 },
  { date: 'Tue', worksheets: 3, target: 1, avgScore: 82 },
  { date: 'Wed', worksheets: 2, target: 1, avgScore: 85 },
  { date: 'Thu', worksheets: 4, target: 1, avgScore: 75 },
  { date: 'Fri', worksheets: 2, target: 3, avgScore: 60 },
  { date: 'Sat', worksheets: 5, target: 3, avgScore: 92, isToday: true },
  { date: 'Sun', worksheets: 0, target: 3, avgScore: 0 },
];

// Weekly Activity Data (Bar Chart)
export const WEEKLY_ACTIVITY_DATA: ChartDataPoint[] = [
  { date: 'Week 1', worksheets: 6, target: 10, avgScore: 75 },
  { date: 'Week 2', worksheets: 9, target: 12, avgScore: 78 },
  { date: 'Week 3', worksheets: 13, target: 13, avgScore: 82 },
  { date: 'Week 4', worksheets: 24, target: 14, avgScore: 70 },
  { date: 'Week 5', worksheets: 16, target: 14, avgScore: 88 },
  { date: 'Week 6', worksheets: 20, target: 14, avgScore: 92 }, 
];

// Accuracy Data
export const ACCURACY_DATA: AccuracyDataPoint[] = [
  { date: 'Week 1', score: 75, classAvg: 70 },
  { date: 'Week 2', score: 78, classAvg: 72 },
  { date: 'Week 3', score: 82, classAvg: 75 },
  { date: 'Week 4', score: 70, classAvg: 76 },
  { date: 'Week 5', score: 88, classAvg: 78 },
  { date: 'Week 6', score: 92, classAvg: 80 },
];

export const PHYSICS_RADAR_DATA: RadarDataPoint[] = [
  { topic: 'Mechanics', A: 120, B: 110, fullMark: 150 },
  { topic: 'Dynamics', A: 98, B: 130, fullMark: 150 },
  { topic: 'Energy', A: 86, B: 130, fullMark: 150 },
  { topic: 'Momentum', A: 99, B: 100, fullMark: 150 },
  { topic: 'Waves', A: 85, B: 90, fullMark: 150 },
  { topic: 'Optics', A: 65, B: 85, fullMark: 150 },
];

export const CHAPTER_PERFORMANCE_DATA: ChapterDataPoint[] = [
  { name: 'Ch 1', score: 95, worksheets: 4 },
  { name: 'Ch 2', score: 88, worksheets: 6 },
  { name: 'Ch 3', score: 92, worksheets: 3 },
  { name: 'Ch 4', score: 75, worksheets: 8 },
  { name: 'Ch 5', score: 82, worksheets: 5 },
];

// --- RANKING SYSTEM (REFACTORED: PAGES SUBMITTED) ---

export const RANK_SYSTEM: RankTier[] = [
  { id: 1, title: "Novice Scholar", subtitle: "Getting Started", minPoints: 0, minPages: 0, icon: Sparkles, color: "text-gray-500" },
  { id: 2, title: "HS Junior", subtitle: "Setara Kelas 11", minPoints: 0, minPages: 20, icon: BookOpen, color: "text-blue-500" },
  { id: 3, title: "Varsity Senior", subtitle: "Setara Kelas 12", minPoints: 0, minPages: 50, icon: GraduationCap, color: "text-green-600" },
  { id: 4, title: "Uni Freshman", subtitle: "Mahasiswa Sem 1", minPoints: 0, minPages: 100, icon: Zap, color: "text-orange-500" },
  { id: 5, title: "Research Fellow", subtitle: "Asisten Dosen", minPoints: 0, minPages: 200, icon: Microscope, color: "text-purple-600" },
  { id: 6, title: "Nobel Laureate", subtitle: "World Class", minPoints: 0, minPages: 500, icon: Award, color: "text-akcen-blue" },
];

export const CURRENT_USER_STATS = {
  points: 0, // Deprecated/Hidden
  pagesCompleted: 64, // Updated to track pages
};

export const DAILY_QUESTS = [
    { id: 1, title: 'Concept Review', desc: 'Watch 2 Concept Videos', current: 1, target: 2, xp: 0, icon: BookOpen, completed: false },
    { id: 2, title: 'High Accuracy', desc: 'Score 100% on a Quiz', current: 0, target: 1, xp: 0, icon: Target, completed: false },
    { id: 3, title: 'Submission Goal', desc: 'Submit 2 Pages', current: 1, target: 2, xp: 0, icon: Scroll, completed: false, claimed: false },
];
