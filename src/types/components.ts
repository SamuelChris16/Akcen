/* Strapi Types */
export interface StrapiMedia {
  url: string;
  mime: string;
  alternativeText: string | null;
}

/* Lesson-elements */
export interface LessonText {
    __component: "lesson-elements.lesson-text",    
    content: string
}
export interface LessonMedia {
    __component: "lesson-elements.lesson-media",    
    content: StrapiMedia,
    fallback_url: string
}
export interface LessonQuiz {
    __component: "lesson-elements.lesson-quiz",    
    questions: question_item[]
}
export type LessonContent = LessonText | LessonMedia | LessonQuiz;

/* Quiz-elements */

export interface question_item {
    __component: "quiz-elements.question-item",
    question_text: string,
    question_long_text: string,
    question_media: StrapiMedia,
    quiz_options: quiz_option[]
}

export interface quiz_option{
    __component: "quiz-elements.quiz-option",
    option_text: string
}

