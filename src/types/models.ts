
/* STRAPI JSON FORMAT (HANDLED BY THE API) */

export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  mime?: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface CourseAttributes {
  title: string;
  description: string;
  price: number;
  slug: string;
  coverImage?: {
    data: {
      attributes: {
        url: string;
      }
    }
  };
}


/* COMPONENT TYPES SCHEMA */

// Component: lesson-elements.lesson-text
export interface ComponentLessonText {
  __component: 'lesson-elements.lesson-text';
  id: number;
  content: string; // Rich text or Markdown
}

// Component: lesson-elements.lesson-media
export interface ComponentLessonMedia {
  __component: 'lesson-elements.lesson-media';
  id: number;
  content: StrapiMedia; // The actual video/image file
  fallback_url?: string; // Optional external link
}

// Sub-Component: quiz-elements.quiz-option
export interface ComponentQuizOption {
  id: number;
  option_text: string;
  is_correct?: boolean; // WARNING: This might be missing if you stripped it for security!
}

// Sub-Component: quiz-elements.question-item
export interface ComponentQuestionItem {
  id: number;
  question_text: string;
  question_long_text?: string;
  question_media?: StrapiMedia | null;
  quiz_options: ComponentQuizOption[];
}

// Component: lesson-elements.lesson-quiz
export interface ComponentLessonQuiz {
  __component: 'lesson-elements.lesson-quiz';
  id: number;
  questions: ComponentQuestionItem[];
}

// Union Type: Represents ANY block inside the Lesson Content
export type LessonContentBlock = 
  | ComponentLessonText 
  | ComponentLessonMedia 
  | ComponentLessonQuiz;

/* THE ACTUAL SCHEMA USED BY THE FRONT END STARTS HERE */

export interface Course {
  id: number;
  documentId: string;
  course_title: string;
  course_description: string;
  course_price: number;
  course_slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  
  course_cover?: StrapiMedia;

  lessons?: Lesson[]; 
}

export interface Lesson {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  lesson_title: string;

  // The Dynamic Zone (Array of different blocks)
  lesson_content: LessonContentBlock[]; 
}
