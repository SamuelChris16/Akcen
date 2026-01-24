import { Course, CourseAttributes, StrapiResponse } from '@/src/types/models';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:1337/api'; 
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x200.png?text=No+Image';

export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const response = await axios.get<StrapiResponse<CourseAttributes>>(`${API_URL}/courses?populate=*`);
    
    // Sanitize
    return response.data.data.map((item) => {
      const attrs = item.attributes;
      
      return {
        id: item.id,
        title: attrs.title || 'Untitled Course',
        description: attrs.description || '',
        
        price: attrs.price || 0,
        coverImage: attrs.coverImage?.data?.attributes?.url 
          ? `http://10.0.2.2:1337${attrs.coverImage.data.attributes.url}`
          : PLACEHOLDER_IMAGE
      };
    });
    
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};