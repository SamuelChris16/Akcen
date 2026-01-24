
/* STRAPI JSON FORMAT (HANDLED BY THE API) */

export interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
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


/* THE ACTUAL SCHEMA USED BY THE FRONT END STARTS HERE */

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  coverImage: string;
}