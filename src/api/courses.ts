import { Course, CourseAttributes, StrapiResponse } from '@/src/types/models';
import { client, BASE_URL } from '@/src/api/client';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x200.png?text=No+Image';

export const fetchCourses = async (): Promise<Course[]> => {
  try {

    const response = await client.get<StrapiResponse<CourseAttributes>>('/courses?populate=*');
    
    return response.data.data.map((item) => {
      const attrs = item.attributes;
      
      return {
        id: item.id,
        title: attrs.title || 'Untitled Course',
        description: attrs.description || '',
        price: attrs.price || 0,
        
        coverImage: attrs.coverImage?.data?.attributes?.url 
          ? `${BASE_URL}${attrs.coverImage.data.attributes.url}`
          : PLACEHOLDER_IMAGE
      };
    });
    
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};