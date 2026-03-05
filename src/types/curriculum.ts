import type { LessonContent, StrapiMedia } from './components';

export interface Course{
  id: number,
  documentId: string,
  course_title: string,
  course_description: string,
  course_price: number,
  course_cover: StrapiMedia,
  course_slug: string,
  phases: Phase[]
}
export interface Phase {
  id: number,
  documentId: string,
  phase_code: string,
  is_active: boolean,
  levels: Level[],
}
export interface Level {
  id: number,
  documentId: string,
  level_code: string,
  level_title: string,
  is_finished: boolean,
  level_introduction: Lesson|null,
  chapters: Chapter[]
}
export interface Chapter {
  id: number,
  documentId: string,
  chapter_code: string,
  chapter_title: string,
  is_finished: string,
  sets: Set[],
  chapter_introduction: Lesson|null
}
export interface Set {
  id: number,
  documentId: string,
  set_code: string,
  set_title: string,
  lessons: Lesson[]
}
export interface Lesson {
  id: number,
  documentId: string,
  lesson_code: string,
  lesson_title: string,
  is_finished: boolean,
  lesson_content?: LessonContent[]
}