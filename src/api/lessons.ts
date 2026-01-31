import { client, BASE_URL } from '@/src/api/client';
import qs from 'qs';
import { LessonBlock, LessonDetail } from '../types/models';


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

const unpackBlock = (block: any): LessonBlock => {
  switch (block.__component) {
    case 'lesson-elements.video':
      return {
        id: block.id,
        type: 'video',
        content: {
          url: block.VideoUrl,
          duration: block.Duration || 0,
        }
      };
    case 'lesson-elements.lesson-quiz':
      return {
        id: block.id,
        type: 'quiz',
        content: {
          questions: block.Questions || []
        }
      };
    case 'lesson-elements.rich-text':
      return {
        id: block.id,
        type: 'text',
        content: {
          markdown: block.Body
        }
      };
    default:
      return { id: block.id, type: 'unknown', content: block };
  }
};

export const fetchLesson = async (id: string): Promise<LessonDetail | null> => {
  try {
    const query = qs.stringify(DEEP_QUERY, { encode: false });
    const response = await client.get(`/lessons/${id}?${query}`);
    
    const data = response.data.data;
    if (!data) return null;

    const attrs = data.attributes;

    return {
      id: data.id,
      title: attrs.title || 'Untitled Lesson',
      description: attrs.description || '',

      blocks: (attrs.Content || []).map(unpackBlock), 
    };

  } catch (error) {
    console.error(`Error fetching lesson ${id}:`, error);
    return null;
  }
};