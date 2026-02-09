import { client, BASE_URL } from '@/src/api/client';
import qs from 'qs';
import { Lesson, LessonContentBlock, ComponentQuestionItem } from '../types/models';


const DEEP_QUERY = {
  populate: {
    lesson_content: {
      on: {

        'lesson-elements.lesson-quiz': {
          populate: {
            questions: {
              populate: {
                question_media: {
                  fields: ['url', 'alternativeText', 'width', 'height']
                },
                quiz_options: { populate: '*' }
              }
            }
          }
        },

        'lesson-elements.lesson-media': { 
          populate: '*'
        },

        'lesson-elements.lesson-text': {
          populate: '*'
        }
      }
    }
  }
};

export const unpackBlock = (block: any): LessonContentBlock => {
  switch (block.__component) {
    
    case 'lesson-elements.lesson-text':
      return {
        __component: 'lesson-elements.lesson-text',
        id: block.id,
        content: block.content || '' 
      };

    case 'lesson-elements.lesson-media':
      return {
        __component: 'lesson-elements.lesson-media',
        id: block.id,
        // Strapi returns a media object, not just a URL string
        content: block.content ? {
          id: block.content.id,
          documentId: block.content.documentId,
          url: `${BASE_URL}${block.content.url}`,
          width: block.content.width,
          height: block.content.height,
          alternativeText: block.content.alternativeText
        } : null as any, 
        fallback_url: block.fallback_url
      };

    case 'lesson-elements.lesson-quiz':
      return {
        __component: 'lesson-elements.lesson-quiz',
        id: block.id,
        questions: (block.questions || []).map((q: any): ComponentQuestionItem => ({
          id: q.id,
          question_text: q.question_text,
          question_long_text: q.question_long_text,
          
          question_media: q.question_media ? {
            id: q.question_media.id || 0,
            documentId: q.question_media.documentId || '',
            url: `${BASE_URL}${q.question_media.url}`,
            width: q.question_media.width,
            height: q.question_media.height,
            alternativeText: q.question_media.alternativeText
          } : null,

          // Deep Mapping: Quiz Options
          quiz_options: (q.quiz_options || []).map((opt: any) => ({
            id: opt.id,
            option_text: opt.option_text,
            is_correct: opt.is_correct // (Will be undefined if you stripped it securely)
          }))
        }))
      };

    default:
      console.warn(`Unknown component type: ${block.__component}`);
      // @ts-ignore
      return { id: block.id, __component: 'unknown', content: block };
  }
};

export const fetchLesson = async (id: string): Promise<Lesson | null> => {
  try {
    const query = qs.stringify(DEEP_QUERY, { encode: false });
    const response = await client.get(`/lessons/${id}?${query}`);
    
    const data = response.data.data;
    if (!data) return null;

    return {
      id: data.id,
      documentId: data.documentId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      publishedAt: data.publishedAt,
      lesson_title: data.lesson_title || 'Untitled Lesson',
      

      lesson_content: (data.lesson_content || []).map(unpackBlock)
    };

  } catch (error) {
    console.error(`Error fetching lesson ${id}:`, error);
    return null;
  }
};