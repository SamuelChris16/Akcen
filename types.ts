
export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  role: string;
  level?: string; // For Mentors
}

export interface WorksheetEvent {
  id: string;
  title: string;
  subject: string;
  score: number;
  date: string; // ISO string
  status: 'completed' | 'in-progress' | 'pending';
}

export interface ChartDataPoint {
  date: string;
  worksheets: number;
  target: number; // Added for Daily/Weekly goals
  avgScore: number;
  isToday?: boolean; // Added to highlight current day
}

export interface ProgressDataPoint {
  date: string;
  plannedMin: number; // The bottom of the S-curve corridor
  plannedMax: number; // The top of the S-curve corridor
  actual: number | null; // Actual cumulative progress
}

export interface AccuracyDataPoint {
  date: string;
  score: number;
  classAvg: number;
}

export interface RadarDataPoint {
  topic: string;
  A: number; // Student score
  B: number; // Class average
  fullMark: number;
}

export interface ChapterDataPoint {
  name: string;
  score: number;
  worksheets: number;
}

export enum StatType {
  TOTAL_REPS = 'TOTAL_REPS',
  ACCURACY = 'ACCURACY',
  STREAK = 'STREAK',
  TIME_SPENT = 'TIME_SPENT'
}

export interface NotificationItem {
  id: string;
  type: 'grade' | 'mentor' | 'streak' | 'system' | 'unlock';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionLabel?: string;
  targetTab?: string;
}

export interface RankTier {
  id: number;
  title: string;
  subtitle: string;
  minPoints: number;
  minPages: number; // Changed from minWorksheets to minPages
  icon: any; // Lucide Icon component
  color: string;
}

// --- Chat Types ---
export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: Message[];
}

// --- Mentor Types ---

export interface SubmissionQuestion {
  id: string;
  label: string; // "Q1", "Q2", etc.
  status: 'correct' | 'incorrect'; // Final status (Approved by Mentor)
  aiVerdict: 'correct' | 'incorrect'; // Initial AI grading
  maxPoints: number; // Usually 1 or 10, etc.
}

export interface SubmissionPage {
  id: string;
  pageNumber: number;
  imageUrl: string;
  questions: SubmissionQuestion[]; // List of questions on this page
  pageScore?: number; // Calculated score (0-100)
  aiConfidence?: number; // 0-100
  mentorVerified?: boolean;
}

export interface SubmissionStage {
  id: string;
  title: string; // e.g., "Concept", "Drill"
  pages: SubmissionPage[];
  stageScore?: number; // Average of page scores
}

export interface StudentSubmission {
  id: string;
  studentName: string;
  studentAvatar: string;
  worksheetTitle: string; // This is the "Set" title
  submittedAt: string; // ISO
  status: 'pending' | 'graded';
  stages: SubmissionStage[]; // Hierarchical content
  aiConfidence?: number;
  aisuggestedScore?: number;
}
