import { string } from 'zod';
import type { LessonContent } from './components';


export interface Phase {}
export interface Level {
  id: number,
  documentId: string,
  level_code: string,
  lesson_title: string,
  is_finished: boolean,
  level_introduction: Lesson,
  chapters: Chapter[],
  sets: Set[],
  Lessons: Lesson[]

}
export interface Chapter {}
export interface Set {}
export interface Lesson {
  id: number,
  documentId: string,
  lesson_code: string,
  lesson_title: string,
  is_finished: boolean,
  lesson_content: LessonContent[]
}