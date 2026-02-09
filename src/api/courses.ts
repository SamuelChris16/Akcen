import { client, BASE_URL } from '@/src/api/client';
import { Course } from '@/src/types/models'; 

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300'; // Or your local asset

export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const response = await client.get('/courses?populate=*');

    const rawData = response.data.data;
    
    if (!rawData) return [];

    return rawData.map((item: any) => {

      return {
        id: item.id,

        title: item.course_title || 'Untitled Course',
        description: item.course_description || '',
        price: item.course_price || 0,
        slug: item.course_slug || '',
        
        coverImage: item.course_cover?.url 
          ? `${BASE_URL}${item.course_cover.url}`
          : PLACEHOLDER_IMAGE
      };
    });
    
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};